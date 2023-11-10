import { issueSchema } from "@/lib/validation-schemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";



export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
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
