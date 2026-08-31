import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ErrorState from '../components/ErrorState.jsx';
import FilterBar from '../components/FilterBar.jsx';
import LoadingState from '../components/LoadingState.jsx';
import RequestList from '../components/RequestList.jsx';
import SummaryPanel from '../components/SummaryPanel.jsx';
import useManualReload from '../hooks/useManualReload.js';
import { deleteRequest, getRequests, resetRequests, updateRequestStatus } from '../services/requestService.js';

function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const scenario = searchParams.get('scenario') ?? '';
  const [reloadKey, reload] = useManualReload();
  const [loadState, setLoadState] = useState('idle');
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchText, setSearchText] = useState(''); // TODO B2: เพิ่ม state สำหรับข้อความค้นหา ที่นี่
  const [errorMessage, setErrorMessage] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let ignore = false;
    setLoadState('loading');
    setErrorMessage('');
    setNotice('');

    getRequests({
      scenario,
      onRecovery: (message) => { if (!ignore) setNotice(message); },
    }).then((data) => {
      if (ignore) return;
      setRequests(data);
      setLoadState('success');
    }).catch((error) => {
      if (ignore) return;
      setErrorMessage(error instanceof Error ? error.message : 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ');
      setLoadState('error');
    });

    return () => { ignore = true; };
  }, [scenario, reloadKey]);

  const summary = useMemo(() => ({
    total: requests.length,

    pending: requests.filter((request) => request.status === 'pending').length, //Buhg #2 แก้ไขการคำนวณจำนวนคำร้องสถานะ pending ให้ถูกต้อง โดยไม่ใช้ completed มาคำนวณ
    inProgress: requests.filter((request) => request.status === 'in-progress').length,
    completed: requests.filter((request) => request.status === 'completed').length,
  }), [requests]);

  const filteredRequests = requests.filter((request) => { //*CP-B2.2
  const matchStatus =
    statusFilter === 'all' ||
    request.status === statusFilter;

  const keyword = searchText.toLowerCase();

  const matchSearch =
    request.requesterName.toLowerCase().includes(keyword) ||
    request.details.toLowerCase().includes(keyword);

  return matchStatus && matchSearch; //*CP-B2.3 บังคับให้กรองทั้งสองเงื่อนไขพร้อมกัน
});

  async function handleDelete(requestId) {
    try {
      const nextRequests = await deleteRequest(requestId);
      setRequests(nextRequests); ///Bug #5 แก้ไขการอัปเดตรายการคำร้องหลังจากลบคำร้อง โดยใช้ setRequests เพื่อให้ summary อัปเดต + รอด refresh
      setNotice(`ลบคำร้อง ${requestId} แล้ว`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'ลบคำร้องไม่สำเร็จ');
    }
  }

  async function handleMarkDone(requestId) {
    try {
       const nextRequests = await updateRequestStatus(
       requestId,
       'completed'
    );

    setRequests(nextRequests);

    setNotice(`อัปเดตคำร้อง ${requestId} เป็น completed แล้ว`);
  } catch (error) {
    setNotice(
      error instanceof Error
        ? error.message
        : 'อัปเดตสถานะไม่สำเร็จ'
    );
  }
}

  async function handleReset() {
    if (!window.confirm('ต้องการคืนข้อมูลตัวอย่างเริ่มต้นหรือไม่?')) return;
    try {
      const nextRequests = await resetRequests(); //Bug #6 แก้ไขการคืนข้อมูลตัวอย่างเริ่มต้น โดยใช้ resetRequests() เพื่อให้ summary อัปเดต + รอด refresh
      setRequests(nextRequests);
      setStatusFilter('all');
      setNotice('คืนข้อมูลตัวอย่างเริ่มต้นแล้ว');
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'คืนข้อมูลไม่สำเร็จ');
    }
  }

  return (
    <section data-testid="page-dashboard">
      <div className="page-heading">
        <div><p className="eyebrow dark">ROUTED + PERSISTENT</p><h1>Dashboard</h1><p>ติดตามคำร้องจาก URL, Service Layer และ browser storage</p></div>
        <button className="button secondary" data-testid="reset-button" type="button" onClick={handleReset}>Reset Demo Data</button>
      </div>
      {scenario && <p className="lab-scenario" role="status">LAB test scenario: {scenario}</p>}
      {notice && <p className="notice" role="status">{notice}</p>}
      {loadState === 'loading' && <LoadingState />}
      {loadState === 'error' && <ErrorState message={errorMessage} onRetry={handleRetry} />}
      {loadState === 'success' && requests.length === 0 && (
        <section className="state-card" data-testid="empty-state">
          <h2>ยังไม่มีคำร้อง</h2><p>เริ่มสร้างคำร้องแรกของคุณได้เลย</p><Link className="button primary inline" to="/requests/new">สร้างคำร้องใหม่</Link>
        </section>
      )}
      {loadState === 'success' && requests.length > 0 && (
        <>
          <SummaryPanel summary={summary} />
          <section className="panel" aria-labelledby="request-list-title">
            <div className="section-heading"><h2 id="request-list-title">รายการคำร้อง</h2><FilterBar value={statusFilter} onFilterChange={setStatusFilter} /></div>
            {/* TODO B2: วางช่อง <input> ค้นหา ตรงนี้ (เหนือรายการ) แล้วกรองร่วมกับตัวกรองสถานะ */}
            <input 
              placeholder="ค้นหาจากผู้แจ้งหรือรายละเอียด"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />  
            {/* TODO B3: เพิ่ม onMarkDone={handleMarkDone} และเขียน handleMarkDone ให้เรียก updateRequestStatus แล้ว setRequests เพื่อให้ summary อัปเดต + รอด refresh */}
            <RequestList requests={filteredRequests} onDeleteRequest={handleDelete} onMarkDone={handleMarkDone} />
          </section>
        </>
      )}
    </section>
  );
}

export default DashboardPage;


///ไฟล์/บรรทัด: src/pages/DashboardPage.jsx ในส่วน summaryจำนวนคำร้องสถานะ pending ถูกคำนวณจาก completed ทำให้ตัวเลข "รอดำเนินการ" ไม่ตรงกับข้อมูลจริง