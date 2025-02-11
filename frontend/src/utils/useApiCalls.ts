import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUserById } from "../redux/actions/userActions";
import { fetchInvestors } from "../redux/actions/investorsActions";
import { fetchInvestorById } from "../redux/actions/investorActions";
import { fetchInvestorAccById } from "../redux/actions/investorAccActions";
import { fetchProjects } from "../redux/actions/projectsActions";
import { fetchImages } from "../redux/actions/fetchImagesActions";
import { fetchAcademy } from "../redux/actions/academyActions";

const useApiCalls = (dispatch: any, token: string | null) => {
    const userId = useSelector((state: any) => state.userDetails?.user?.id); // Replace `auth.userId` with the correct path in your Redux state
    const roles = useSelector((state: any) => state.userDetails?.user?.roles); // Get user roles from Redux state
    const investors = useSelector((state: any) => state.investorsDetails?.investors); // Get the list of
    
    // Always call fetchProjects
    useEffect(() => {
        dispatch(fetchProjects());
        dispatch(fetchAcademy());
        dispatch(fetchImages())
    }, [dispatch]);
    
    useEffect(() => {
        const initialize = async () => {
            if (!token || !userId) {
                console.warn("No token or userId, skipping API calls");
                return;
            }
            
            try {
                await dispatch(fetchUserById(userId) as any); // Dynamically pass userId
                
                const isInvestor = roles?.some((role: { name: string }) => role.name === "Investor");
                
                if (isInvestor) {
                    // Fetch all investors if user has 'investor' role
                    await dispatch(fetchInvestors());
                }
            } catch (error) {
                console.error("Error during API calls:", error);
            }
        };

        initialize();
    }, [dispatch, token, userId]);

    useEffect(() => {
        if (!investors || !userId) return;
    
        // Find the current investor after investors are fetched
        const currentInvestor = investors.find((investor: any) => investor.userId === userId);
        if (currentInvestor) {
          // Fetch detailed investor data
          dispatch(fetchInvestorById(Number(currentInvestor?.id)));
          dispatch(fetchInvestorAccById(Number(currentInvestor?.id)));
        } else {
          console.warn("Investor not found for userId:", userId);
        }
      }, [investors, userId, dispatch]); // Trigger when investors or userId changes
};

export default useApiCalls;
