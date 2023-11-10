import Link from 'next/link'
import React from 'react'

export function IssueActions() {
  return (
    <header className="mb-5">
      <Link href="/issues/new">New issue</Link>
    </header>
  )
}

export default IssueActions;
