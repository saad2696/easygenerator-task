import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSubscriptions } from '../redux/subscriptions/actions';

interface UseSubscriptionsReturn {
    enabled: boolean;
    activeTab: string;
    setEnabled: (enabled: boolean) => void;
    setActiveTab: (tab: string) => void;
    handleTabClick: (tab: string) => void;
    selectSubscriptions: (item: any) => void;
}

export const useSubscriptions = (): UseSubscriptionsReturn => {
    const [enabled, setEnabled] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState<string>('Individual/ Teams');

    const handleTabClick = (tab: string): void => {
        setActiveTab(tab);
    };

    const selectSubscriptions = (item: any): void => {
        dispatch(setSubscriptions(
            {
                  subscriptionName: item.text,
                  price: item.price,
                  subscriptionDescriptions: item.user,
              }
        ));
        navigate("/signup");
    };

    return {
        enabled,
        activeTab,
        setEnabled,
        setActiveTab,
        handleTabClick,
        selectSubscriptions
    };
};
