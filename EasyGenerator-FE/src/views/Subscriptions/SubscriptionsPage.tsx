import React from "react";
import { Switch } from "@headlessui/react";
import { useSubscriptions } from "../../hooks/useSubscriptions";
import { pricingData, tabValue } from "../../dummy-content/SubscritpionsData";

const SubscriptionsPage: React.FC = () => {
  const { enabled, activeTab, setEnabled, handleTabClick, selectSubscriptions } = useSubscriptions();
    return (
    <>
     <div className="h-screen">
  <h1 className="mt-8 font-600 leading-9 tracking-tight text-primary-black text-[40px] text-center">
    Choose a plan that works for you
  </h1>
  <div className="flex flex-col md:flex-row items-center px-4 py-5  justify-center self-center">
  {tabValue.map((tab) => (
        <span
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={`font-semibold leading-9 tracking-tight text-primary-grey px-5 text-[14px] cursor-pointer text-center border-b-2 ${
            activeTab === tab ? 'border-secondary' : 'border-primary-lightwhite'
          }`}
        >
          {tab}
        </span>
      ))}
  </div>
  <div className="flex flex-col md:flex-row items-center px-4 py-2 justify-center self-center">
  <span className="font-semibold leading-9 tracking-tight text-primary-black text-[16px]  text-center px-5 ">
  Monthly Billing
    </span>
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`
         'bg-white' 
       relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-2 border-primary-light items-center px-2  duration-200 ease-in-out  w-[86px] h-[40px]`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${
          enabled ? 'translate-x-10' : 'translate-x-0'
        } pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-primary-light shadow ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  <span className="font-semibold leading-9 tracking-tight text-primary-lightgrey text-[16px]  text-center px-2 ">
  Annual Billing
    </span>
  </div>
 

  <div className="flex flex-wrap items-center px-4 py-5  justify-center self-center ">
  {pricingData.map((item, index) => (
  <div key={index} className="bg-white w-[272px] sm:w-[272px] h-[697px] m-4 flex flex-col items-center p-5 rounded-xl border-[1px] border-[#D6D7D9] shadow-xl">
    <span className="font-semibold leading-9 tracking-tigh text-primary-black text-[24px] mb-2 text-center w-full">
      {item.text}
    </span>
    <span className="font-semibold leading-9 tracking-tight text-primary-grey text-[32px] mb-2 text-center w-full">
      {item.price}
    </span>
    <span className="font-400 leading-9 tracking-tight text-primary-darkgrey text-[12px] mb-2 text-center ">
      {item.user}
    </span>
   
    <button onClick={()=>{selectSubscriptions(item)}} type="button" className="text-white bg-primary-light hover:bg-primary-light   font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">Get Started</button>
    <div className=" border-b border-gray w-full my-5 px-5"/>
    {item.items && (
      <ul className="pl-5 space-y-2 list-none w-full ">
        {item.items.map((listItem, idx) => (
          <li key={idx} className="w-full">
            <span className="font-400 leading-7 tracking-tight text-xs text-left text-[12px] text-primary-grey">
              {listItem.title.split(new RegExp(`(${item.highlight})`, 'gi')).map((part, i) => (
                <span key={i} className={part.toLowerCase() === item?.highlight?.toLowerCase() ? 'font-bold' : ''}>
                  {part}
                </span>
              ))}
            </span>
            {listItem?.description && (
              <p className="font-400 leading-3 tracking-tight text-[11px] text-primary-lightgrey text-left">
                {listItem?.description.split('\n').map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </p>
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
))}

</div>

    </div>
    </>
  );
};

export default SubscriptionsPage;