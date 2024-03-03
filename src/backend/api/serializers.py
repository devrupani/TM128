from rest_framework import serializers
from .models import EventModel
from django.contrib.auth.hashers import make_password
from rest_framework import serializers, exceptions

from api.models import User
class UserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    username = serializers.CharField(required=True)
    phone_number = serializers.CharField(required=True)
    email = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "username",
            "first_name",
            "last_name",
            "password",
            "email",
            "phone_number",
        ]

    def validate_phone_number(self, phoneNumber):
        if len(phoneNumber) < 13:
            raise exceptions.ValidationError(
                "Please enter a valid phone number with a country code."
            )

        if User.objects.filter(phone_number=phoneNumber).exists():
            raise exceptions.ValidationError(
                "User with this phone number already exists"
            )

        return phoneNumber

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])

        return super().create(validated_data)
    
class EventSerializers(serializers.HyperlinkedModelSerializer):
    event_id = serializers.ReadOnlyField()
    class Meta:
        model = EventModel
        fields ="__all__"