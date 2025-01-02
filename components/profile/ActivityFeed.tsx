'use client';

import { MessageSquare, BookOpen, Heart } from "lucide-react";

const activities = [
  {
    type: "forum",
    title: "Responded to 'Machine Learning Project Ideas'",
    time: "2 hours ago",
    icon: MessageSquare,
  },
  {
    type: "blog",
    title: "Published 'My Summer Internship Experience'",
    time: "1 day ago",
    icon: BookOpen,
  },
  {
    type: "engagement",
    title: "Liked 'Tips for Remote Learning'",
    time: "2 days ago",
    icon: Heart,
  },
];

const ActivityFeed = () => {
  return (
    <div className="bg-card dark:bg-card rounded-lg shadow-lg p-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4 text-foreground dark:text-foreground">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-3 rounded-lg transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <div className="p-2 rounded-full bg-primary/10">
              <activity.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-foreground dark:text-foreground font-medium">{activity.title}</p>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;