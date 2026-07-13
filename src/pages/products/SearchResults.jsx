import { useNavigate } from "react-router-dom";
import SearchOverlay from "./SearchOverlay";

export default function SearchResults() {
  const navigate = useNavigate();

  return <SearchOverlay onClose={() => navigate(-1)} />;
}
