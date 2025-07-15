import { useNavigate } from "react-router-dom";
import Button from "../Button";

interface Props {
  onEdit: () => void;
}

const ProfileHeader: React.FC<Props> = ({ onEdit }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-8 border-b pb-4">
      <h1 className="text-3xl font-bold">Profile</h1>
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button onClick={onEdit}>Edit Profile</Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
