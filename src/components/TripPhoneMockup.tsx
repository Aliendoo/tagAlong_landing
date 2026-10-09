const savedPlaces = [
  { name: 'Luna Rooftop', detail: 'Dinner · 7:30 PM', votes: '4 votes', color: 'coral' },
  { name: 'The little cove', detail: 'Swim stop · 11 AM', votes: '3 votes', color: 'lavender' },
  { name: 'Sunday market', detail: 'Explore · 9 AM', votes: '2 votes', color: 'lime' },
]

export function TripPhoneMockup() {
  return (
    <div className="phone-stage" aria-label="Preview of a shared TagAlong itinerary">
      <div className="photo-card photo-card-back" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=520&q=85"
          alt=""
        />
        <span>THE GROUP CHAT PICKED IT</span>
      </div>
      <div className="floating-sticker sticker-saved" aria-hidden="true">
        <span>✦</span> saved!
      </div>
      <div className="floating-sticker sticker-friends" aria-hidden="true">
        <span className="avatar avatar-one">M</span>
        <span className="avatar avatar-two">J</span>
        <span className="avatar avatar-three">A</span>
        <b>3 friends in</b>
      </div>
      <div className="phone-frame">
        <div className="phone-notch" />
        <div className="phone-screen">
          <div className="phone-topline">
            <span>YOUR NEXT TRIP</span>
            <span className="phone-menu">•••</span>
          </div>
          <h3>Lisbon, together</h3>
          <div className="trip-meta"><span>4 DAYS</span><span>·</span><span>4 FRIENDS</span></div>
          <div className="phone-map" aria-hidden="true">
            <div className="map-line map-line-one" />
            <div className="map-line map-line-two" />
            <span className="map-pin pin-one">1</span>
            <span className="map-pin pin-two">2</span>
            <span className="map-pin pin-three">3</span>
            <span className="map-label">ALFAMA</span>
          </div>
          <div className="place-list-heading"><span>YOUR CREW'S PICKS</span><span>See all</span></div>
          <div className="phone-place-list">
            {savedPlaces.map((place) => (
              <div className="phone-place" key={place.name}>
                <span className={`place-dot place-dot-${place.color}`} />
                <div><b>{place.name}</b><small>{place.detail}</small></div>
                <span className="vote-count">{place.votes}</span>
              </div>
            ))}
          </div>
          <div className="phone-bottom-bar" aria-hidden="true">
            <span className="bottom-icon active">⌂</span><span className="bottom-icon">♡</span>
            <span className="bottom-icon">◉</span><span className="bottom-icon">☺</span>
          </div>
        </div>
      </div>
    </div>
  )
}