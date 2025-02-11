import Dashboard from "../components/desktop/Dashboard";
import DashboardMobile from "../components/mobile/DashboardMobile";


const Index: React.FC = () => {

  return (
    <>
        <main>
          <Dashboard/>
          <DashboardMobile/>
        </main>
    </>
  );
};

export default Index;
