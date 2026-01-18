from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SportViewSet,
    RuleViewSet,
    TechniqueViewSet,
    LearningSectionViewSet,
    LearningTopicViewSet,
)

router = DefaultRouter()
router.register(r'sports', SportViewSet, basename='sport')
router.register(r'rules', RuleViewSet, basename='rule')
router.register(r'techniques', TechniqueViewSet, basename='technique')
router.register(r'sections', LearningSectionViewSet, basename='learning-section')
router.register(r'topics', LearningTopicViewSet, basename='learning-topic')

urlpatterns = [
    path('', include(router.urls)),
]
