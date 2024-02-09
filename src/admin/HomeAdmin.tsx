
import AdminNavbar from "../components/admin/AdminNavbar";
import AdminTabWrapper from "../components/admin/AdminTabWrapper";
import LineChart from "../components/chart/LineChart";


function HomeAdmin() {

    const dummyData = {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
            {
                label: 'One Way',
                values: [10, 9, 15, 25, 30, 0, 0],
                borderColor: 'rgba(75, 192, 192, 1)',
            },
            {
                label: 'Round Trip',
                values: [5, 15, 10, 20, 25, 0, 0],
                borderColor: 'rgba(255, 99, 132, 1)',
            },
            {
                label: 'Local',
                values: [25, 30, 20, 35, 40, 0, 0],
                borderColor: 'rgba(255, 205, 86, 1)',
            },
            {
                label: 'Airport',
                values: [15, 10, 5, 12, 18, 0, 0],
                borderColor: 'rgba(54, 162, 235, 1)',

            },
        ],
    };


    return (
        <>
            <AdminNavbar />
            <AdminTabWrapper>
                <div className="grid grid-cols-4 gap-5">
                    <div className="border px-5 py-6 flex justify-center items-center flex-col gap-5">
                        <h1 className="text-3xl font-bold text-slate-700">One Way</h1>
                        <h1 className="text-5xl font-bold text-slate-900">50</h1>
                    </div>
                    <div className="border px-5 py-6 flex justify-center items-center flex-col gap-5">
                        <h1 className="text-3xl font-bold text-slate-700">Round Trip</h1>
                        <h1 className="text-5xl font-bold text-slate-900">10</h1>
                    </div>
                    <div className="border px-5 py-6 flex justify-center items-center flex-col gap-5">
                        <h1 className="text-3xl font-bold text-slate-700">Local</h1>
                        <h1 className="text-5xl font-bold text-slate-900">1</h1>
                    </div>
                    <div className="border px-5 py-6 flex justify-center items-center flex-col gap-5">
                        <h1 className="text-3xl font-bold text-slate-700">Airport</h1>
                        <h1 className="text-5xl font-bold text-slate-900">4</h1>
                    </div>

                </div>
                <div className="">
                    <LineChart data={dummyData} />
                </div>

            </AdminTabWrapper>
        </>
    );
}

export default HomeAdmin;
