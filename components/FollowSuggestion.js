import Image from "next/image";

const FollowSuggestion = ({user}) => {
  return (
    <div className="flex items-center pr-4 hover:bg-gray-200 transition duration-200 cursor-pointer">
      <Image src={user.picture.thumbnail} width="40" height="40" alt="" className="rounded-full ml-2" />
      <div className="flex flex-col justify-start pl-4 truncate">
        <p className="font-bold text-[13px] hover:underline truncate">{user.login.username}</p>
        <span className="text-[11px] text-gray-500 truncate">{user.name.first} {user.name.last}</span>
      </div>
      <button className="bg-blue-500 text-white rounded-full px-3 py-1 ml-auto font-bold text-sm hover:bg-blue-600">Follow</button>
    </div>
  );
};

export default FollowSuggestion;
