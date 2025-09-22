import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

// Configuration for OAuth providers - Update these with your client IDs
const OAUTH_CONFIG = {
  google: {
    clientId: "YOUR_GOOGLE_CLIENT_ID", // Replace with your Google OAuth client ID
    redirectUri: window.location.origin + "/auth/callback",
  },
  facebook: {
    appId: "YOUR_FACEBOOK_APP_ID", // Replace with your Facebook App ID
    redirectUri: window.location.origin + "/auth/callback",
  }
};

// Backend endpoint for authentication
const AUTH_ENDPOINT = "YOUR_EXPRESS_BACKEND_URL/auth"; // Replace with your Express.js auth endpoint

export const AuthDialog = ({ isOpen, onClose }: AuthDialogProps) => {
  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    try {
      let authUrl = '';
      
      if (provider === 'google') {
        authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
          `client_id=${OAUTH_CONFIG.google.clientId}&` +
          `redirect_uri=${encodeURIComponent(OAUTH_CONFIG.google.redirectUri)}&` +
          `response_type=code&` +
          `scope=openid email profile`;
      } else if (provider === 'facebook') {
        authUrl = `https://www.facebook.com/v18.0/dialog/oauth?` +
          `client_id=${OAUTH_CONFIG.facebook.appId}&` +
          `redirect_uri=${encodeURIComponent(OAUTH_CONFIG.facebook.redirectUri)}&` +
          `scope=email,public_profile`;
      }
      
      // Open popup window for OAuth
      const popup = window.open(authUrl, 'oauth', 'width=500,height=600');
      
      // Listen for the callback
      const handleCallback = async (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'OAUTH_SUCCESS') {
          // Send the authorization code to your Express.js backend
          const response = await fetch(`${AUTH_ENDPOINT}/${provider}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              code: event.data.code,
              provider: provider
            })
          });
          
          const result = await response.json();
          
          if (response.ok) {
            // Handle successful authentication
            console.log('Authentication successful:', result);
            localStorage.setItem('authToken', result.token); // Store auth token
            onClose();
            window.location.reload(); // Refresh to update UI
          } else {
            console.error('Authentication failed:', result.error);
          }
          
          popup?.close();
          window.removeEventListener('message', handleCallback);
        }
      };
      
      window.addEventListener('message', handleCallback);
      
      // Check if popup was closed without completing auth
      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', handleCallback);
        }
      }, 1000);
      
    } catch (error) {
      console.error(`${provider} login error:`, error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Welcome to Shopping Cart Application</DialogTitle>
          <DialogDescription className="text-center">
            Sign in to your account to start shopping
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Button
            onClick={() => handleSocialLogin("google")}
            variant="professional"
            className="w-full h-12 text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">
                G
              </div>
              <span>Continue with Google</span>
            </div>
          </Button>

          <Button
            onClick={() => handleSocialLogin("facebook")}
            variant="professional"
            className="w-full h-12 text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                f
              </div>
              <span>Continue with Facebook</span>
            </div>
          </Button>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </div>
      </DialogContent>
    </Dialog>
  );
};