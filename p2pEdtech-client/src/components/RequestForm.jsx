const RequestForm = ({ onSubmit, onClose }) => {
    const [message, setMessage] = useState('');
    const [topic, setTopic] = useState('');
    const [dates, setDates] = useState(['']);
    
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(message, topic, dates.map(date => new Date(date)));
    };
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white border-4 border-black p-6 shadow-brutal max-w-md w-full"
        >
          <h3 className="text-xl font-bold mb-4">Request Session</h3>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Topic"
            className="input-brutal mb-4"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            className="input-brutal mb-4"
            rows="4"
          />
          {dates.map((date, index) => (
            <input
              key={index}
              type="datetime-local"
              value={date}
              onChange={(e) => {
                const newDates = [...dates];
                newDates[index] = e.target.value;
                setDates(newDates);
              }}
              className="input-brutal mb-2"
            />
          ))}
          <button
            type="button"
            onClick={() => setDates([...dates, ''])}
            className="btn-brutal mb-4"
          >
            Add Another Time
          </button>
          <div className="flex gap-4">
            <button type="submit" className="btn-brutal-green">
              Send Request
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-brutal-red"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  };
  
export default RequestForm;