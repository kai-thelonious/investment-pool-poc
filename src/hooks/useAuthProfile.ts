import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { dataService } from '../services/dataService';
import { INITIAL_USERS, UserItem } from '../data/mockData';

export function useAuthProfile(fundTotal: number) {
  const { user: authUser, profile } = useAuth();
  const [users, setUsers] = useState<UserItem[]>(INITIAL_USERS);
  const [activeUserId, setActiveUserId] = useState<string>('usr-1');
  const [isProfilesLive, setIsProfilesLive] = useState<boolean>(false);

  const loadProfiles = useCallback(async () => {
    const res = await dataService.getProfiles();
    setUsers(res.data);
    setIsProfilesLive(res.isLive);
    setActiveUserId((prev) =>
      prev && res.data.some((u) => u.id === prev) ? prev : res.data[0]?.id || 'usr-1'
    );
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProfiles();
    const channel = dataService.subscribeToTableChanges('profiles', loadProfiles);
    return () => {
      channel.unsubscribe();
    };
  }, [loadProfiles]);

  const currentUser: UserItem = users.find(
    (u) =>
      (authUser && u.id === authUser.id) ||
      (profile && u.name.toLowerCase().includes(profile.name.toLowerCase())) ||
      (activeUserId && u.id === activeUserId)
  ) ||
    users[0] || {
      id: 'usr-1',
      name: 'Alice Smith',
      deposited: 0,
      pending: 0,
    };

  const totalCapitalDeposited = users.reduce((sum, u) => sum + Number(u.deposited), 0);

  const currentUserSharePercent =
    totalCapitalDeposited > 0
      ? ((currentUser.deposited / totalCapitalDeposited) * 100).toFixed(1)
      : '0.0';

  const currentUserCurrentValue = Math.round((fundTotal * Number(currentUserSharePercent)) / 100);

  return {
    users,
    setUsers,
    activeUserId,
    setActiveUserId,
    currentUser,
    currentUserSharePercent,
    currentUserCurrentValue,
    isProfilesLive,
    loadProfiles,
  };
}
