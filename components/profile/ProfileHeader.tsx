'use client';

import { GraduationCap, Award, BookOpen, MessageSquare } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const ProfileHeader = () => {
  return (
    <div className="w-full bg-card dark:bg-card rounded-lg shadow-lg p-6 mb-6 animate-fade-in">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <img
              src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 bg-primary rounded-full p-2">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-foreground dark:text-foreground">John Doe</h1>
            <p className="text-muted-foreground dark:text-muted-foreground">Computer Science • Year 3</p>
            <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-2">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                Dean's List 2023
              </span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                Research Assistant
              </span>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground dark:text-muted-foreground">Degree Progress</span>
              <span className="text-sm font-medium text-primary">75%</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <StatCard icon={GraduationCap} label="GPA" value="3.8/4.0" />
        <StatCard icon={Award} label="Credits" value="90/120" />
        <StatCard icon={BookOpen} label="Courses" value="24" />
        <StatCard icon={MessageSquare} label="Forum Posts" value="156" />
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-600 hover:shadow-md">
    <div className="flex items-center gap-3">
      <Icon className="w-5 h-5 text-primary" />
      <div>
        <p className="text-sm text-muted-foreground dark:text-muted-foreground">{label}</p>
        <p className="font-semibold text-foreground dark:text-foreground">{value}</p>
      </div>
    </div>
  </div>
);

export default ProfileHeader;