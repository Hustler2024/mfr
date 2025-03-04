import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { CalendarDays, Bell, User, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface DashboardHeaderProps {
  clientName?: string;
  proposalDate?: string;
  logoUrl?: string;
  notifications?: number;
  onProfileClick?: () => void;
  onNotificationsClick?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  clientName = "Sarah Johnson",
  proposalDate = "April 15, 2023",
  logoUrl = "/vite.svg",
  notifications = 2,
  onProfileClick = () => {},
  onNotificationsClick = () => {},
}) => {
  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div className="flex items-center space-x-2">
        <img src={logoUrl} alt="Finnie Logo" className="h-10 w-auto" />
        <div className="hidden md:block">
          <h1 className="text-xl font-bold text-blue-600">Finnie Mortgage</h1>
          <p className="text-sm text-gray-500">Your Personalized Proposal</p>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="hidden md:flex items-center text-gray-600">
          <CalendarDays className="h-5 w-5 mr-2" />
          <span className="text-sm">{proposalDate}</span>
        </div>

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={onNotificationsClick}
          >
            <Bell className="h-5 w-5 text-gray-600" />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                {notifications}
              </span>
            )}
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 p-1">
              <Avatar>
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${clientName}`}
                  alt={clientName}
                />
                <AvatarFallback>{clientName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">{clientName}</p>
                <p className="text-xs text-gray-500">Client</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onProfileClick}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
