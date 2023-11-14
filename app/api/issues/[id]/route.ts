import { issueSchema } from "@/lib/validation-schemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/auth-options";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json();
  const session = await getServerSession(authOptions);
  const validation = issueSchema.safeParse(body);

  if (!session) {
    return NextResponse.json({}, { status: 401 })
  }

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  })

  if (!issue) {
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 })
  }
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description
    }
  })

  return NextResponse.json(updatedIssue)

}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const paramId = parseInt(params.id)
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({}, { status: 401 })
  }
  const issue = await prisma.issue.findUnique({
    where: { id: paramId }
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 })
  }

  await prisma.issue.delete({
    where: { id: paramId }
  })

  return NextResponse.json({})
}
