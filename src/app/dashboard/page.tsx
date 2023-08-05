'use client';

import { GridItem, SimpleGrid } from '@chakra-ui/react';
import useSWR from 'swr';
import { PendingTicket } from './_components/pending-ticket';
import { TicketPaymentModal } from './_components/ticket-payment-modal';
import { NewTicketButton } from './_components/new-ticket-button';
import { NewTicketModal } from './_components/new-ticket-modal';

type DashboardProps = {
  searchParams: { modal: string } | undefined;
};

export default function Dashboard(props: DashboardProps) {
  const { searchParams } = props;

  const { data: tickets, isLoading } = useSWR<RemoteTicket[]>(
    `/api/tickets/not-finalized`
  );

  if (isLoading) {
    return null;
  }

  const ticketId = searchParams?.modal && searchParams?.modal !== 'new-ticket';
  const newTicket =
    (searchParams?.modal && searchParams?.modal === 'new-ticket') || false;

  return (
    <>
      <SimpleGrid columns={4} spacing={6}>
        {tickets?.map((ticket) => (
          <GridItem key={ticket.id} colSpan={{ base: 4, sm: 2, lg: 1 }}>
            <PendingTicket {...ticket} />
          </GridItem>
        ))}
      </SimpleGrid>

      <TicketPaymentModal
        ticket={tickets?.find((ticket) => ticket.id === ticketId)}
      />

      <NewTicketButton />

      <NewTicketModal isOpen={newTicket} />
    </>
  );
}
