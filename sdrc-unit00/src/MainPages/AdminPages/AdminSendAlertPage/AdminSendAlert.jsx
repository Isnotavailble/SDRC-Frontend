import './AdminSendAlert.css';
import SendAlertFormCard from '../../Cards/SendAlertFormCard/SendAlertFormCard';
import AnimateInView from '../../../Animations/AnimateInView';
export default function AdminSendAlert() {
    return (
        <div className="send-alert-container">
            <h1>Dispatch Alert</h1>
            <p className='label-for-title'>Send Alert to Targeted User</p>
            <div className='line' style={{ marginBottom: "40px", width: "100%" }}></div>
            <AnimateInView>
                <div className='send-alert-context-box'>


                    <SendAlertFormCard />

                </div>
            </AnimateInView>

        </div>

    );
}