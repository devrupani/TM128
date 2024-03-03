from django.urls import path, include
from rest_framework import routers
from .views import EventViewSet
from api.views import createUser, verifyToken, login_with_session, logout_session
from .views import register_user

router = routers.DefaultRouter()
router.register('event', EventViewSet)

urlpatterns = [
    path("user/", createUser),
    path("verify/", verifyToken),
    path("login/", login_with_session),
    path("logout/", logout_session),
     path('register/', register_user, name='register_user'),
    path('', include(router.urls)),
]

# urlpatterns = [
#     path("user", createUser),
#     path("verify", verifyToken),
#     path("login", login_with_session),
#     path("logout", logout_session),
#     # path("token", CustomAuthTokenView.as_view()),
# ]