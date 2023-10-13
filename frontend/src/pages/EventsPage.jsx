import React from 'react'
import Header from '../components/Layout/Header'
import EventCard from '../components/Events/EventCard'
import Loader from '../components/Layout/Loader';
import { useSelector } from 'react-redux';
import Footer from '../components/Layout/Footer';

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          <br />
          <br />
          
          <EventCard active={true} data={allEvents && allEvents[0]} />
          <Footer/>
        </div>
      )}
    </>
  );
};

export default EventsPage
