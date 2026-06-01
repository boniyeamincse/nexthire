export default function RecentBookingsTable({ bookings }) {
  return (
    <section className="student-panel">
      <div className="student-panel-heading-row">
        <div>
          <div className="student-panel-eyebrow">Recent Bookings</div>
          <h3>Your latest scheduled and completed interviews</h3>
        </div>
      </div>

      <div className="student-table-wrap">
        <table className="student-table">
          <thead>
            <tr>
              <th>Interview Title</th>
              <th>Tutor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={`${booking.title}-${booking.date}`}>
                <td>{booking.title}</td>
                <td>{booking.tutor}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{booking.payment}</td>
                <td><span className="student-row-status">{booking.status}</span></td>
                <td><button type="button" className="student-table-action">{booking.action}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
