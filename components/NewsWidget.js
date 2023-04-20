import Image from "next/image";

const NewsWidget = ({props}) => {
    return (
        <a href={props.url} target="_blank">
            <div className="flex p-2 items-end justify-between hover:bg-gray-200 transition duration-200">
                <div className="space-y-0.5">
                    <h6 className="font-bold text-sm">{props.title.split("-")[0]}</h6>
                    <span className="text-xs font-medium text-gray-500">- {props.source.name}</span>
                </div>
                <img className="rounded-xl objext-contain" width="70px" height="50px" src={props.urlToImage} alt="news-image"/>
            </div>
            
        </a>
    );
};

export default NewsWidget;