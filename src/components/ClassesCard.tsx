import React from 'react';

type ClassesCardProps = {
  className: string;
  properties: string;
};

const ClassesCard: React.FC<ClassesCardProps> = ({ className, properties }) => (
  <div className="text-white">
    <h3>{className}</h3>
    <p>{properties}</p>
  </div>
);

export default ClassesCard;