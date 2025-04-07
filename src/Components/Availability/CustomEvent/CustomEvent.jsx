import { format } from 'date-fns';
import styles from './customEvent.module.scss';
import './newcss.css'


const statusColors = {
  Booked: '#F9F0F0',    
  Available: '#FFF9EE', 
  "Not Confirm": '#008000',      
  Default: '#f5f5f5'    
};

const CustomEvent = ({ event }) => {
  const getBackgroundColor = () => {
    return statusColors[event.status] || statusColors.Default;
  };

  return (
    <div 
      className={styles.eventContainer}
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <div className={styles.eventTitle}>{event.title}</div>
      <div className={styles.eventTime}>
        {format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
      </div>
    </div>
  );
};

export default CustomEvent;