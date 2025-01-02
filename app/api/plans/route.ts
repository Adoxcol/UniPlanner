import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; // MongoDB client
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

// Course Interface
interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  difficulty: "Easy" | "Medium" | "Hard";
  section?: string;
  time?: string;
  grade?: string;
}

// Semester Interface
interface Semester {
  id: string;
  name: string;
  totalCredits: number;
  courses: Course[];
}

// Plan Interface
interface Plan {
  userId: string;
  planName: string;
  universityName?: string;
  requiredCredits: number;
  totalCredits: number;
  semesters: Semester[];
  createdAt: string;
  updatedAt: string;
}

// University Interface
interface University {
  id: string;
  universities_name: string;
  universities_short_name: string;
  location?: string;
  website?: string;
}

// Function to save a degree plan
async function saveDegreePlan(
  planName: string,
  requiredCredits: number,
  totalCredits: number,
  semesters: Semester[],
  universityName: string | undefined,
  userId: string
) {
  const client = await clientPromise;
  const db = client.db("UniversityPlans");

  const result = await db.collection("degreePlans").insertOne({
    planName,
    requiredCredits,
    totalCredits,
    semesters,
    universityName,
    userId,
    createdAt: new Date().toISOString(), // Store the current date as ISO string
    updatedAt: new Date().toISOString(), // Store the current date as ISO string
  });

  return result;
}

// Function to fetch all degree plans for a user
async function fetchUserPlans(userId: string) {
  const client = await clientPromise;
  const db = client.db("UniversityPlans");

  const plansData = await db.collection("degreePlans").find({ userId }).toArray();
  return plansData;
}

// Named export for the GET method to fetch all plans for a user
export async function GET(request: Request) {
  try {
    const userId = request.url.split("/").pop();
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const plans = await fetchUserPlans(userId);
    return NextResponse.json(plans); // Send user's plans data as JSON response
  } catch (error) {
    console.error("Error fetching user plans:", error);
    return NextResponse.json({ error: "Failed to fetch user plans" }, { status: 500 });
  }
}

// Named export for the POST method to save a degree plan
export async function POST(request: Request) {
  try {
    const { planName, requiredCredits, totalCredits, semesters, universityName, userId } = await request.json();

    if (!planName || !requiredCredits || !totalCredits || !semesters || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await saveDegreePlan(
      planName,
      requiredCredits,
      totalCredits,
      semesters,
      universityName,
      userId
    );

    return NextResponse.json({ success: true, message: "Degree plan saved successfully", planId: result.insertedId });
  } catch (error) {
    console.error("Error saving degree plan:", error);
    return NextResponse.json({ error: "Failed to save degree plan" }, { status: 500 });
  }
}
