import { cookies } from 'next/headers';

const randomInteger = (min = 0, max = 10) => {
  if (min > max) {
    throw new Error('Min value cannot be greater than max value');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const genFakeData = () => {
  const today = new Date();
  const startDate = new Date();
  startDate.setMonth(today.getMonth() - 2); // Lấy ngày từ 2 tháng trước

  // List số lượng user chơi game, group theo ngày, mỗi ngày sẽ có 2 số liệu là số lượt chơi quizGame và shakeGame
  const chartUserPlay = [];
  let currentDate = startDate;

  while (currentDate <= today) {
    chartUserPlay.push({
      date: currentDate.toISOString().split('T')[0], // Chuyển đổi ngày sang định dạng "yyyy-mm-dd"
      quizGame: randomInteger(0, 100), // Số ngẫu nhiên trong khoảng [0, 100]
      shakeGame: randomInteger(0, 100) // Số ngẫu nhiên trong khoảng [0, 120]
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

  // List thống kê số lượng voucher đã phát trong 6 tháng vừa qua, chia ra voucher của quizGame và voucher của shakeGame
  const chartVoucher = [
    {
      month: 'August',
      quizGame: randomInteger(0, 200),
      shakeGame: randomInteger(100, 200)
    },
    {
      month: 'September',
      quizGame: randomInteger(0, 200),
      shakeGame: randomInteger(100, 200)
    },
    {
      month: 'October',
      quizGame: randomInteger(0, 200),
      shakeGame: randomInteger(100, 200)
    },
    {
      month: 'November',
      quizGame: randomInteger(0, 200),
      shakeGame: randomInteger(100, 200)
    },
    {
      month: 'December',
      quizGame: randomInteger(0, 200),
      shakeGame: randomInteger(100, 200)
    },
    {
      month: 'January',
      quizGame: randomInteger(0, 200),
      shakeGame: randomInteger(100, 200)
    }
  ];

  // list user chơi game, group theo store, filter time trong 6 tháng gần nhất
  const chartUserStore = [
    { id: 1, name: 'Cửa hàng 1', total_user_play: randomInteger(100, 1000) },
    { id: 2, name: 'Cửa hàng 2', total_user_play: randomInteger(100, 1000) },
    { id: 3, name: 'Cửa hàng 3', total_user_play: randomInteger(100, 1000) },
    { id: 4, name: 'Cửa hàng 4', total_user_play: randomInteger(100, 1000) },
    { id: 5, name: 'Cửa hàng 5', total_user_play: randomInteger(100, 1000) }
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

export async function getOverview(): Promise<any> {
  const fakeData = genFakeData();
  // return fakeData;
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  console.log('___accessToken:', accessToken);

  const response = await fetch(
    `${process.env.API_GATEWAY_URL}/api/v1/cms/overview`,
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

  console.log('___Result getOverview:', rs);

  // console.log(stores);
  return rs;
}
