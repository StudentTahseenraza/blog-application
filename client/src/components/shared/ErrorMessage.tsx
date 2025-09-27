import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorMessage = ({ 
  title = "Something went wrong", 
  message = "An unexpected error occurred. Please try again.",
  onRetry,
  className 
}: ErrorMessageProps) => {
  return (
    <div className={className}>
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertTriangle className="w-4 h-4" />
        <AlertDescription className="space-y-3">
          <div>
            <div className="font-semibold">{title}</div>
            <div className="mt-1 text-sm">{message}</div>
          </div>
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="w-full"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
};