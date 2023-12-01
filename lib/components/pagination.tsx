"use client"
import { ChevronRightIcon, ChevronLeftIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

function usePagination({ itemCount, currentPage, pageSize }: Props) {
  const pageCount = Math.ceil(itemCount / pageSize);
  const router = useRouter();
  const searchParams = useSearchParams();

  return [
    {
      isFirstPage: currentPage === 1,
      isLastPage: currentPage === pageCount,
      pageCount
    },
    {
      updatePage: (page: number): void => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push(`?${params.toString()}`)
      },
    }
  ]
}

export function Pagination(props: Props) {
  const [{ pageCount, isFirstPage, isLastPage }, { updatePage }] = usePagination(props)

  if (!pageCount || pageCount <= 1) return null;

  return (
    <Flex align="center" gap="2">
      <Text size="2">Page {props.currentPage} of {pageCount}</Text>
      <Button color='gray' variant='soft' disabled={isFirstPage} onClick={() => updatePage(1)}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button color='gray' variant='soft' disabled={isFirstPage} onClick={() => updatePage(props.currentPage - 1)}>
        <ChevronLeftIcon />
      </Button>
      <Button color='gray' variant='soft' disabled={isLastPage} onClick={() => updatePage(props.currentPage + 1)}>
        <ChevronRightIcon />
      </Button>
      <Button color='gray' variant='soft' disabled={isLastPage} onClick={() => updatePage(pageCount)}>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  )
}

export default Pagination
