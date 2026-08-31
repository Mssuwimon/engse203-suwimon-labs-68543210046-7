import RequestCard from './RequestCard.jsx';

function RequestList({ requests, onDeleteRequest, onMarkDone }) {
  if (requests.length === 0) return <p className="subtle-empty">ไม่มีคำร้องที่ตรงกับการค้นหา</p>;
  return (
    <div className="request-list" data-testid="request-list">
      {requests.map((request) => (

        <RequestCard key={request.id} request={request} onDeleteRequest={onDeleteRequest} onMarkDone={onMarkDone} />
      ))}
    </div>
  );
}

export default RequestList;



//Bug #1 Console เตือนสีเหลืองเรื่องรายการ key ที่ซ้ำกันใน React เมื่อใช้ map เพื่อสร้างรายการของ RequestCard แต่ไม่ได้กำหนด key ให้กับแต่ละ RequestCard ซึ่งอาจทำให้ React ไม่สามารถติดตามการเปลี่ยนแปลงของรายการได้อย่างถูกต้อง