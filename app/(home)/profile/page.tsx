import { getProfile } from "@/lib/action";

const ProfilePage = async () => {
    const res  = await getProfile();
    return ( 
        <div>{JSON.stringify(res)}</div>
     );
}
 
export default ProfilePage;