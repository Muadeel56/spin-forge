from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


class UserRegistrationTests(TestCase):
    """Test user registration endpoint."""

    def setUp(self):
        self.client = APIClient()
        self.signup_url = '/api/auth/signup/'

    def test_user_registration_success(self):
        """Test successful user registration."""
        data = {
            'email': 'test@example.com',
            'username': 'testuser',
            'password': 'testpass123',
            'password_confirm': 'testpass123',
        }
        response = self.client.post(self.signup_url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('user', response.data)
        self.assertIn('tokens', response.data)
        self.assertIn('access', response.data['tokens'])
        self.assertIn('refresh', response.data['tokens'])
        self.assertEqual(response.data['user']['email'], 'test@example.com')
        self.assertEqual(response.data['user']['username'], 'testuser')
        
        # Verify user was created
        self.assertTrue(User.objects.filter(email='test@example.com').exists())

    def test_user_registration_duplicate_email(self):
        """Test registration with duplicate email."""
        User.objects.create_user(
            email='existing@example.com',
            username='existing',
            password='pass123'
        )
        
        data = {
            'email': 'existing@example.com',
            'username': 'newuser',
            'password': 'testpass123',
            'password_confirm': 'testpass123',
        }
        response = self.client.post(self.signup_url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_registration_password_mismatch(self):
        """Test registration with mismatched passwords."""
        data = {
            'email': 'test@example.com',
            'username': 'testuser',
            'password': 'testpass123',
            'password_confirm': 'differentpass',
        }
        response = self.client.post(self.signup_url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('password', response.data)


class UserLoginTests(TestCase):
    """Test user login endpoint."""

    def setUp(self):
        self.client = APIClient()
        self.login_url = '/api/auth/login/'
        self.user = User.objects.create_user(
            email='test@example.com',
            username='testuser',
            password='testpass123'
        )

    def test_login_success(self):
        """Test successful login."""
        data = {
            'email': 'test@example.com',
            'password': 'testpass123',
        }
        response = self.client.post(self.login_url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('user', response.data)
        self.assertIn('tokens', response.data)
        self.assertIn('access', response.data['tokens'])
        self.assertIn('refresh', response.data['tokens'])
        self.assertEqual(response.data['user']['email'], 'test@example.com')

    def test_login_invalid_email(self):
        """Test login with invalid email."""
        data = {
            'email': 'wrong@example.com',
            'password': 'testpass123',
        }
        response = self.client.post(self.login_url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_invalid_password(self):
        """Test login with invalid password."""
        data = {
            'email': 'test@example.com',
            'password': 'wrongpassword',
        }
        response = self.client.post(self.login_url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class ProtectedEndpointTests(TestCase):
    """Test protected endpoint access."""

    def setUp(self):
        self.client = APIClient()
        self.user_url = '/api/auth/user/'
        self.user = User.objects.create_user(
            email='test@example.com',
            username='testuser',
            password='testpass123'
        )

    def test_protected_endpoint_without_auth(self):
        """Test accessing protected endpoint without authentication."""
        response = self.client.get(self.user_url)
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_protected_endpoint_with_auth(self):
        """Test accessing protected endpoint with authentication."""
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')
        
        response = self.client.get(self.user_url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], 'test@example.com')
        self.assertEqual(response.data['username'], 'testuser')


class TokenRefreshTests(TestCase):
    """Test token refresh endpoint."""

    def setUp(self):
        self.client = APIClient()
        self.refresh_url = '/api/auth/token/refresh/'
        self.user = User.objects.create_user(
            email='test@example.com',
            username='testuser',
            password='testpass123'
        )

    def test_token_refresh_success(self):
        """Test successful token refresh."""
        refresh = RefreshToken.for_user(self.user)
        data = {
            'refresh': str(refresh),
        }
        response = self.client.post(self.refresh_url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)

    def test_token_refresh_invalid_token(self):
        """Test token refresh with invalid token."""
        data = {
            'refresh': 'invalid_token',
        }
        response = self.client.post(self.refresh_url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class LogoutTests(TestCase):
    """Test logout endpoint."""

    def setUp(self):
        self.client = APIClient()
        self.logout_url = '/api/auth/logout/'
        self.user = User.objects.create_user(
            email='test@example.com',
            username='testuser',
            password='testpass123'
        )

    def test_logout_success(self):
        """Test successful logout."""
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')
        
        data = {
            'refresh': str(refresh),
        }
        response = self.client.post(self.logout_url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)

    def test_logout_without_auth(self):
        """Test logout without authentication."""
        refresh = RefreshToken.for_user(self.user)
        data = {
            'refresh': str(refresh),
        }
        response = self.client.post(self.logout_url, data, format='json')
        
        # Logout requires authentication
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
