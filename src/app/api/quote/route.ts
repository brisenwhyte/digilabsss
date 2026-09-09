import { NextResponse } from "next/server";

type QuoteSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  message?: string;
  createdAt: string;
};

const submissions: QuoteSubmission[] = [];

function isNonEmpty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<QuoteSubmission>;

    if (
      !isNonEmpty(body.name) ||
      !isNonEmpty(body.email) ||
      !isValidEmail(body.email) ||
      !isNonEmpty(body.phone) ||
      !isNonEmpty(body.company) ||
      !isNonEmpty(body.projectType) ||
      !isNonEmpty(body.budget)
    ) {
      return NextResponse.json(
        { message: "Please complete all required enquiry fields." },
        { status: 400 },
      );
    }

    const submission: QuoteSubmission = {
      id: crypto.randomUUID(),
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      company: body.company.trim(),
      projectType: body.projectType.trim(),
      budget: body.budget.trim(),
      message: body.message?.trim(),
      createdAt: new Date().toISOString(),
    };

    submissions.unshift(submission);
    console.info("[strategy-enquiry]", submission);

    return NextResponse.json({ ok: true, id: submission.id });
  } catch {
    return NextResponse.json(
      { message: "The enquiry could not be submitted." },
      { status: 500 },
    );
  }
}

export function GET() {
  return NextResponse.json({ submissions });
}