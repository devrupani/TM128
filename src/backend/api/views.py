from django.shortcuts import render
from rest_framework import viewsets
from .models import EventModel
from .serializers import EventSerializers
from django.contrib.auth import login, logout
from django.shortcuts import render, HttpResponse, redirect
from firebase_admin import auth
from rest_framework.authentication import TokenAuthentication
from .models import UserModel
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

from api.serializers import UserSerializer
from .models import User


def otp_login(request):
    if request.method == "POST":
        uid = request.POST.get("uid")
        phone = request.POST.get("phone")

        if uid != None and phone != None:
            phone = "+91" + phone
            user = api.get_user(uid)

            if user.phone_number == phone:
                users = User.objects.filter(phone_number=phone)
                if users.exists():
                    login(request, users.first())
                    return redirect("/admin")
                else:
                    return HttpResponse("User doesn't exists")
            else:
                return HttpResponse("User not found")
        else:
            return HttpResponse("Hacking is not allowed")

    return render(request, "admin/login.html")


@api_view(["POST"])
def createUser(request: Request):
    # if "username" in request.data:
    #     request.data["username"] = request.data.get("username").lower()
    request.data["username"] = request.data.get("phone_number").lower()
    userSerializer = UserSerializer(data=request.data)
    userSerializer.is_valid(raise_exception=True)
    user: User = userSerializer.save()

    return Response(
        data={"message": "Account created successfully.",
              "user": userSerializer.data}
    )


@api_view(["POST"])
def login_with_session(request: Request):
    uid = request.data.get("uid")
    phone = request.data.get("phone_number")

    if uid is not None and phone is not None:
        user = auth.get_user(uid)
        if user.phone_number == phone:
            users = User.objects.filter(phone_number=phone)
            if users.exists():
                # login(request, users.first())
                token, created = Token.objects.get_or_create(
                    user=users.first())
                return Response(
                    {"message": "Login successful", "token": token.key},
                    status=HTTP_200_OK,
                )
            else:
                raise ValidationError(
                    {"phone_number": ["Phone number is not registered"]}
                )
        else:
            raise ValidationError(
                {"phone_number": ["Phone number is not registered"]})
    else:
        raise ValidationError(
            {"phone_number": ["Phone number is not registered"]})


@api_view(["GET", "POST"])
def logout_session(request: Request):
    logout(request)
    return Response({"message": "Successfully logged out"}, status=HTTP_200_OK)


@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def verifyToken(request: Request):
    userSerializer = UserSerializer(request.user)

    return Response(
        data={"message": "Account verified successfully.",
              "user": userSerializer.data}
    )


class CustomAuthTokenView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        if request.data.get("username"):
            request.data["username"] = request.data["username"].lower()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token":token.key})
                         
# Create your views here.
class EventViewSet(viewsets.ModelViewSet):
    queryset = EventModel.objects.all()
    serializer_class =EventSerializers 


def register_user(request):
    if request.method == 'POST':
        username = request.POST.get('Username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('password')
        terms_and_conditions = request.POST.get('terms_and_conditions') == 'on'

        # Perform validation and create the user
        if password == confirm_password and terms_and_conditions:
            user = UserModel.objects.create(username=username, email=email, password=password, confirm_password=confirm_password, terms_and_conditions=terms_and_conditions)
            # Additional logic for user registration
            return redirect('#')  # Redirect to a success page or login page

    return render(request, './Green/register.html')