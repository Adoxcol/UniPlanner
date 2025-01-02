export default async function savePlan(plan: any) {
    try {
      const response = await fetch('/api/plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(plan),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save the plan');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error in savePlan:', error);
      throw error;
    }
  }
  