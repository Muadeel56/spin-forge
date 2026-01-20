from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Notification
from .serializers import NotificationSerializer, NotificationMarkReadSerializer
from .services import mark_notification_as_read, mark_all_notifications_as_read, get_unread_count


class NotificationViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for Notification model.
    
    list: Get paginated notifications (unread first, then read)
    retrieve: Get single notification
    mark_as_read: Mark single notification as read
    mark_all_read: Mark all notifications as read
    unread_count: Get count of unread notifications
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = NotificationSerializer
    
    def get_queryset(self):
        """
        Return notifications for the current user.
        Ordered by unread first, then by created_at descending.
        """
        return Notification.objects.filter(
            recipient=self.request.user
        ).select_related(
            'actor', 'actor__profile', 'content_type'
        ).order_by('is_read', '-created_at')
    
    @action(detail=True, methods=['patch'], url_path='read')
    def mark_as_read(self, request, pk=None):
        """
        Mark a single notification as read.
        PATCH /api/v1/notifications/:id/read
        """
        notification = self.get_object()
        success = mark_notification_as_read(notification.id, request.user)
        
        if success:
            serializer = self.get_serializer(notification)
            # Refresh from database to get updated is_read value
            notification.refresh_from_db()
            serializer = self.get_serializer(notification)
            return Response(serializer.data)
        else:
            return Response(
                {'error': 'Failed to mark notification as read.'},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    @action(detail=False, methods=['post'], url_path='mark-all-read')
    def mark_all_read(self, request):
        """
        Mark all notifications as read for the current user.
        POST /api/v1/notifications/mark-all-read
        """
        count = mark_all_notifications_as_read(request.user)
        return Response({
            'success': True,
            'count': count,
            'message': f'{count} notification(s) marked as read.'
        })
    
    @action(detail=False, methods=['get'], url_path='unread-count')
    def unread_count(self, request):
        """
        Get count of unread notifications.
        GET /api/v1/notifications/unread-count
        """
        count = get_unread_count(request.user)
        return Response({
            'count': count
        })
