"use client";
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface OrderStatusBadgeProps {
  status: 'pending' | 'completed' | 'failed' | 'cancelled' | 'processing';
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig = {
  pending: {
    label: "Pendiente",
    icon: Clock,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200"
  },
  completed: {
    label: "Completada",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  },
  failed: {
    label: "Fallida",
    icon: XCircle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200"
  },
  cancelled: {
    label: "Cancelada",
    icon: AlertCircle,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200"
  },
  processing: {
    label: "Procesando",
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  }
};

export default function OrderStatusBadge({ 
  status, 
  showIcon = true, 
  size = 'md' 
}: OrderStatusBadgeProps) {
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base"
  };

  const iconSizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ${config.bgColor} ${config.color} ${sizeClasses[size]}`}>
      {showIcon && <StatusIcon className={iconSizeClasses[size]} />}
      {config.label}
    </span>
  );
} 