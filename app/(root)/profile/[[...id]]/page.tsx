import AcademicTimeline from "@/components/profile/AcademicTimeline";
import ActivityFeed from "@/components/profile/ActivityFeed";
import ProfileHeader from "@/components/profile/ProfileHeader";

const Index = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <ProfileHeader />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <AcademicTimeline />
            </div>
            <div>
              <ActivityFeed />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;