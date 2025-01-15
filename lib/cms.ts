import { format } from 'date-fns';
import { cookies } from 'next/headers';

const randomInteger = (min = 0, max = 10) => {
  if (min > max) {
    throw new Error('Min value cannot be greater than max value');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const genFakePartnerData = () => {
  const today = new Date();
  const startDate = new Date();
  startDate.setMonth(today.getMonth() - 2); // Lấy ngày từ 2 tháng trước

  // List số lượng user chơi game, group theo ngày, mỗi ngày sẽ có 2 số liệu là số lượt chơi quiz_game và shake_game
  const chartUserPlay = [];
  let currentDate = startDate;

  while (currentDate <= today) {
    chartUserPlay.push({
      date: currentDate.toISOString().split('T')[0], // Chuyển đổi ngày sang định dạng "yyyy-mm-dd"
      quiz_game: randomInteger(0, 100), // Số ngẫu nhiên trong khoảng [0, 100]
      shake_game: randomInteger(0, 100) // Số ngẫu nhiên trong khoảng [0, 120]
    });
    currentDate.setDate(currentDate.getDate() + 1); // Tăng ngày thêm 1
  }

  // Danh sách 5 user mới nhận được voucher
  const listRecentUser = [
    {
      username: 'nguyenvananh123',
      full_name: 'Nguyễn Văn Anh',
      email: 'nguyenvananh123@gmail.com',
      photo: 'https://xsgames.co/randomusers/avatar.php?g=male',
      vouchers: randomInteger(1, 8)
    },
    {
      username: 'tranthimy987',
      full_name: 'Trần Thị My',
      email: 'tranthimy987@gmail.com',
      photo: 'https://avatar.iran.liara.run/public/girl',
      vouchers: randomInteger(1, 8)
    },
    {
      username: 'lehoangbao234',
      full_name: 'Lê Hoàng Bảo',
      email: 'lehoangbao234@gmail.com',
      photo: 'https://avatar.iran.liara.run/public/boy',
      vouchers: randomInteger(1, 8)
    },
    {
      username: 'phamthiquynh456',
      full_name: 'Phạm Thị Quỳnh',
      email: 'phamthiquynh456@gmail.com',
      photo: 'https://xsgames.co/randomusers/avatar.php?g=female',
      vouchers: randomInteger(1, 8)
    },
    {
      username: 'dangminhtuan789',
      full_name: 'Đặng Minh Tuấn',
      email: 'dangminhtuan789@gmail.com',
      photo: 'https://avatar.iran.liara.run/public',
      vouchers: randomInteger(1, 8)
    }
  ];

  // List thống kê số lượng voucher đã phát trong 6 tháng vừa qua, chia ra voucher của quiz_game và voucher của shake_game
  const chartVoucher = [
    {
      month: 'August',
      quiz_game: randomInteger(0, 200),
      shake_game: randomInteger(100, 200)
    },
    {
      month: 'September',
      quiz_game: randomInteger(0, 200),
      shake_game: randomInteger(100, 200)
    },
    {
      month: 'October',
      quiz_game: randomInteger(0, 200),
      shake_game: randomInteger(100, 200)
    },
    {
      month: 'November',
      quiz_game: randomInteger(0, 200),
      shake_game: randomInteger(100, 200)
    },
    {
      month: 'December',
      quiz_game: randomInteger(0, 200),
      shake_game: randomInteger(100, 200)
    },
    {
      month: 'January',
      quiz_game: randomInteger(0, 200),
      shake_game: randomInteger(100, 200)
    }
  ];

  // list user chơi game, group theo store, filter time trong 6 tháng gần nhất
  const chartUserStore = [
    {
      store_id: 1,
      store_name: 'Cửa hàng 1',
      total_user_play: randomInteger(100, 1000)
    },
    {
      store_id: 2,
      store_name: 'Cửa hàng 2',
      total_user_play: randomInteger(100, 1000)
    },
    {
      store_id: 3,
      store_name: 'Cửa hàng 3',
      total_user_play: randomInteger(100, 1000)
    },
    {
      store_id: 4,
      store_name: 'Cửa hàng 4',
      total_user_play: randomInteger(100, 1000)
    },
    {
      store_id: 5,
      store_name: 'Cửa hàng 5',
      total_user_play: randomInteger(100, 1000)
    }
  ];
  return {
    total_store: randomInteger(1, 50),
    total_branch: randomInteger(1, 100),
    total_event: randomInteger(10, 200),
    total_user_play: randomInteger(1000, 100000),
    last_month_total_user_play: randomInteger(1000, 100000),
    chart_user_play: chartUserPlay, // List user
    list_recent_user: listRecentUser,
    chart_voucher: chartVoucher,
    chart_user_store: chartUserStore
  };
};

const genFakeAdminData = () => {
  const today = new Date();
  const startDate = new Date();
  startDate.setMonth(today.getMonth() - 2); // Lấy ngày từ 2 tháng trước

  // List số lượng event được tạo, group theo ngày, mỗi ngày sẽ có 2 số liệu là số event mới quiz_game và shake_game
  const chartEventCreated = [];
  let currentDate = startDate;

  while (currentDate <= today) {
    chartEventCreated.push({
      date: currentDate.toISOString().split('T')[0], // Chuyển đổi ngày sang định dạng "yyyy-mm-dd"
      quiz_game: randomInteger(0, 5), // Số ngẫu nhiên trong khoảng [0, 100]
      shake_game: randomInteger(0, 5) // Số ngẫu nhiên trong khoảng [0, 120]
    });
    currentDate.setDate(currentDate.getDate() + 1); // Tăng ngày thêm 1
  }

  const list_recent = [
    {
      username: 'nguyenvananh123',
      full_name: 'Nguyễn Văn Anh',
      email: 'nguyenvananh123@gmail.com',
      photo: 'https://xsgames.co/randomusers/avatar.php?g=male'
    },
    {
      username: 'tranthimy987',
      full_name: 'Trần Thị My',
      email: 'tranthimy987@gmail.com',
      photo: 'https://avatar.iran.liara.run/public/girl'
    },
    {
      username: 'lehoangbao234',
      full_name: 'Lê Hoàng Bảo',
      email: 'lehoangbao234@gmail.com',
      photo: 'https://avatar.iran.liara.run/public/boy'
    },
    {
      username: 'phamthiquynh456',
      full_name: 'Phạm Thị Quỳnh',
      email: 'phamthiquynh456@gmail.com',
      photo: 'https://xsgames.co/randomusers/avatar.php?g=female'
    },
    {
      username: 'dangminhtuan789',
      full_name: 'Đặng Minh Tuấn',
      email: 'dangminhtuan789@gmail.com',
      photo: 'https://avatar.iran.liara.run/public'
    }
  ];

  // List thống kê số lượng số lượt user chơi quiz_game và shake_game, group by month, ví dụ tháng 1: có 3 user chơi quiz game, 5 user chơi shake game, tháng 2: có 8 user chơi quiz game, 10 user chơi shake game, ...
  const chartUserPlayGame = [
    {
      month: 'August',
      quiz_game: randomInteger(0, 200),
      shake_game: randomInteger(100, 200)
    },
    {
      month: 'September',
      quiz_game: randomInteger(0, 200),
      shake_game: randomInteger(100, 200)
    },
    {
      month: 'October',
      quiz_game: randomInteger(0, 200),
      shake_game: randomInteger(100, 200)
    },
    {
      month: 'November',
      quiz_game: randomInteger(0, 200),
      shake_game: randomInteger(100, 200)
    },
    {
      month: 'December',
      quiz_game: randomInteger(0, 200),
      shake_game: randomInteger(100, 200)
    },
    {
      month: 'January',
      quiz_game: randomInteger(0, 200),
      shake_game: randomInteger(100, 200)
    }
  ];

  // list user chơi game, group by partner username
  const chartUserPlayGroupbyPartner = [
    {
      username: 'partner_01',
      total_user_play: randomInteger(100, 1000)
    },
    {
      username: 'partner_02',
      total_user_play: randomInteger(100, 1000)
    },
    {
      username: 'partner_03',
      total_user_play: randomInteger(100, 1000)
    }
  ];

  return {
    total_partner: randomInteger(0, 50),
    total_partner_last_month: randomInteger(0, 50),
    total_user: randomInteger(0, 50),
    total_user_last_month: randomInteger(0, 50),
    total_branch: randomInteger(0, 50),
    total_branch_last_month: randomInteger(0, 50),
    total_earning: randomInteger(0, 1000000),
    total_earning_last_month: randomInteger(0, 100000),
    chart_event_created: chartEventCreated,
    chart_user_play_game: chartUserPlayGame,
    chart_user_play_group_by_partner: chartUserPlayGroupbyPartner,
    list_recent_partners: list_recent
  };
};

const parseAdminOverviewData = (rawData: any) => {
  // rawData = {
  //   total_partner: 1,
  //   total_partner_last_month: 1,
  //   total_user: 13,
  //   total_user_last_month: 13,
  //   total_branch: 4,
  //   total_branch_last_month: 1,
  //   chart_event_created: [
  //     { date: '1732838400', quiz_game: 2, shake_game: 2 },
  //     { date: '1734998400', quiz_game: 2, shake_game: 2 },
  //     { date: '1735430400', quiz_game: 2, shake_game: 2 },
  //     { date: '1738108800', quiz_game: 2, shake_game: 2 }
  //   ],
  //   chart_user_play_game: [
  //     { month: 'December ', quiz_game: 201, shake_game: 229 },
  //     { month: 'January  ', quiz_game: 182, shake_game: 172 }
  //   ],
  //   chart_user_play_group_by_partner: [ { username: 'partner_user', total_user_play: 13 } ],
  //   list_recent_partners: [
  //     {
  //       username: 'partner_user',
  //       full_name: 'Partner User',
  //       email: 'partner_user@example.com',
  //       photo: 'default-user.jpg'
  //     }
  //   ]
  // }

  rawData?.chart_event_created?.forEach((item: { date: string }) => {
    item.date = format(+item.date * 1000, 'yyyy-MM-dd');
  });

  return rawData;
};

const parsePartnerOverviewData = (rawData: any) => {
  // rawData = {
  //   total_store: 2,
  //   total_branch: 4,
  //   total_event: 20,
  //   total_user_play: 784,
  //   last_month_total_user_play: 314,
  //   chart_user_play: [
  //     { date: '1734393600', quiz_game: 6, shake_game: 7 },
  //     { date: '1734652800', quiz_game: 11, shake_game: 10 },
  //     { date: '1735084800', quiz_game: 7, shake_game: 8 },
  //     { date: '1735344000', quiz_game: 8, shake_game: 6 },
  //     { date: '1735862400', quiz_game: 8, shake_game: 6 },
  //     { date: '1736121600', quiz_game: 7, shake_game: 9 },
  //     { date: '1734739200', quiz_game: 9, shake_game: 12 },
  //     { date: '1734825600', quiz_game: 8, shake_game: 8 },
  //     { date: '1736208000', quiz_game: 12, shake_game: 10 },
  //     { date: '1736553600', quiz_game: 5, shake_game: 5 },
  //     { date: '1734998400', quiz_game: 8, shake_game: 8 },
  //     { date: '1735603200', quiz_game: 10, shake_game: 7 },
  //     { date: '1735948800', quiz_game: 8, shake_game: 9 },
  //     { date: '1736726400', quiz_game: 8, shake_game: 7 },
  //     { date: '1735257600', quiz_game: 8, shake_game: 8 },
  //     { date: '1735430400', quiz_game: 9, shake_game: 7 },
  //     { date: '1736035200', quiz_game: 8, shake_game: 7 },
  //     { date: '1736294400', quiz_game: 9, shake_game: 11 },
  //     { date: '1734566400', quiz_game: 7, shake_game: 9 },
  //     { date: '1734912000', quiz_game: 8, shake_game: 8 },
  //     { date: '1735516800', quiz_game: 8, shake_game: 8 },
  //     { date: '1736640000', quiz_game: 7, shake_game: 7 },
  //     { date: '1736812800', quiz_game: 10, shake_game: 10 },
  //     { date: '1735171200', quiz_game: 9, shake_game: 7 },
  //     { date: '1735689600', quiz_game: 10, shake_game: 7 },
  //     { date: '1735776000', quiz_game: 9, shake_game: 5 },
  //     { date: '1736380800', quiz_game: 7, shake_game: 8 },
  //     { date: '1736467200', quiz_game: 9, shake_game: 9 },
  //     { date: '1734307200', quiz_game: 10, shake_game: 7 },
  //     { date: '1734480000', quiz_game: 9, shake_game: 6 }
  //   ],
  //   list_recent_user: [
  //     {
  //       username: 'hoangmaiJ',
  //       full_name: 'Hoàng Mai J',
  //       email: 'hoangmaiJ@gmail.com',
  //       photo: 'default-user.jpg',
  //       vouchers: 59
  //     },
  //     {
  //       username: 'doquyenH',
  //       full_name: 'Đỗ Quyên H',
  //       email: 'doquyenH@gmail.com',
  //       photo: 'default-user.jpg',
  //       vouchers: 79
  //     },
  //     {
  //       username: 'huynhngocF',
  //       full_name: 'Huỳnh Ngọc F',
  //       email: 'huynhngocF@gmail.com',
  //       photo: 'default-user.jpg',
  //       vouchers: 14
  //     },
  //     {
  //       username: 'dangthuyE',
  //       full_name: 'Đặng Thúy E',
  //       email: 'dangthuyE@gmail.com',
  //       photo: 'default-user.jpg',
  //       vouchers: 68
  //     },
  //     {
  //       username: 'fakeUserC',
  //       full_name: 'Fake User C',
  //       email: 'fakeC@gmail.com',
  //       photo: 'default-user.jpg',
  //       vouchers: 76
  //     }
  //   ],
  //   chart_voucher: [
  //     { month: '2024-12', quiz_game: 201, shake_game: 229 },
  //     { month: '2025-01', quiz_game: 182, shake_game: 172 }
  //   ],
  //   chart_user_store: [
  //     {
  //       store_id: '1',
  //       store_name: 'Highland Coffee',
  //       total_user_play: 13
  //     },
  //     { store_id: '2', store_name: 'Starbucks', total_user_play: 13 }
  //   ]
  // }

  // rawData?.chart_user_play?.forEach((item: { date: string }) => {
  //   item.date = format(+item.date * 1000, 'yyyy-MM-dd');
  // });

  return rawData;
};

export async function getOverview(isPartner = true): Promise<any> {
  const fakeData = isPartner ? genFakePartnerData() : genFakeAdminData();
  // return fakeData;
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  console.log('___accessToken:', accessToken);

  const response = await fetch(
    `${process.env.API_GATEWAY_URL}/api/v1/cms/${
      isPartner ? 'partner-overview' : 'admin-overview'
    }`,
    {
      method: 'GET',
      headers: {
        cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`
      },
      next: { revalidate: 3600 }
    }
  );

  if (!response.ok) {
    return fakeData;
  }

  const rs = await response.json();

  console.log('___rs:', rs);

  if (isPartner) {
    return parsePartnerOverviewData(rs);
  }
  return parseAdminOverviewData(rs);
}
