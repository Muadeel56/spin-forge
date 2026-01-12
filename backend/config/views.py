from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


@api_view(['GET'])
def health_check(request):
    """
    Simple health check endpoint to verify API is working.
    """
    return Response({
        'status': 'ok',
        'message': 'SpinForge API is running successfully',
        'version': '1.0.0'
    }, status=status.HTTP_200_OK)

