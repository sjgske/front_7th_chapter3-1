import React from 'react';
import { Card, CardContent } from '@/components/ui';

type StatItem = {
  label: string;
  value: number;
  bgColor: string;
  borderColor: string;
  textColor: string;
};

type StatsCardsProps = {
  total: number;
  stat1: StatItem;
  stat2: StatItem;
  stat3: StatItem;
  stat4: StatItem;
};

export const StatsCards: React.FC<StatsCardsProps> = ({
  total,
  stat1,
  stat2,
  stat3,
  stat4,
}) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2.5 mb-4">
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-3 pt-3">
          <div className="text-xs text-gray-600 mb-1">전체</div>
          <div className="text-2xl font-bold text-blue-600">{total}</div>
        </CardContent>
      </Card>

      <Card className={`${stat1.bgColor} ${stat1.borderColor}`}>
        <CardContent className="p-3 pt-3">
          <div className="text-xs text-gray-600 mb-1">{stat1.label}</div>
          <div className={`text-2xl font-bold ${stat1.textColor}`}>
            {stat1.value}
          </div>
        </CardContent>
      </Card>

      <Card className={`${stat2.bgColor} ${stat2.borderColor}`}>
        <CardContent className="p-3 pt-3">
          <div className="text-xs text-gray-600 mb-1">{stat2.label}</div>
          <div className={`text-2xl font-bold ${stat2.textColor}`}>
            {stat2.value}
          </div>
        </CardContent>
      </Card>

      <Card className={`${stat3.bgColor} ${stat3.borderColor}`}>
        <CardContent className="p-3 pt-3">
          <div className="text-xs text-gray-600 mb-1">{stat3.label}</div>
          <div className={`text-2xl font-bold ${stat3.textColor}`}>
            {stat3.value}
          </div>
        </CardContent>
      </Card>

      <Card className={`${stat4.bgColor} ${stat4.borderColor}`}>
        <CardContent className="p-3 pt-3">
          <div className="text-xs text-gray-600 mb-1">{stat4.label}</div>
          <div className={`text-2xl font-bold ${stat4.textColor}`}>
            {stat4.value}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
