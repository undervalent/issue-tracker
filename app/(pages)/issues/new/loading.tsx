
import React from 'react'
import { Box } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton';
import { Card, Flex } from '@radix-ui/themes';

export function NewIssueLoading() {
  return (
    <Box className='max-w-xl'>
      <Skeleton />
      <Flex gap="2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count={3} />
      </Card>
    </Box>
  )
}

export default NewIssueLoading;

