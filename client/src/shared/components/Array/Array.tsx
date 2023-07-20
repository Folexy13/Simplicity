import React, { useContext, useEffect, useState } from "react";
import "./Array.scss";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import AppContext from "../../context";

interface ArrayComponentProps {
  array: any[];
  length: number;
  type?: string;
  title: string;
}

const ArrayComponent: React.FC<ArrayComponentProps> = ({
  array,
  length,
  type,
  title,
}) => {
  const [showAll, setShowAll] = useState(false);
  const displayedItems = showAll ? array : array.slice(0, length);
  const [filters, setFilters] = useState<string[]>([]);
  let { categoryCount, setCategoriesCount } = useContext(AppContext);
  const handleChecked = (slug: string) => {
    if (filters.includes(slug)) {
      const updatedFilters = filters.filter((el: string) => el !== slug);
      setFilters(updatedFilters);
      setCategoriesCount(++categoryCount);
    } else {
      const updatedFilters = [...filters, slug];
      setFilters(updatedFilters);
      setCategoriesCount(++categoryCount);
    }
  };
  const handleViewMore = () => {
    setShowAll(true);
  };

  useEffect(() => {
    if (categoryCount === 0) {
      setFilters([]);
    }
  }, [categoryCount]);
  if (type == "courseDescr") {
    return (
      <div className="arr">
        <h4>Category by {title}</h4>
        {displayedItems.map((item: any) => (
          <div key={item.slug} className="itemContainer">
            {filters.includes(item?.slug) ? (
              <ImCheckboxChecked onClick={() => handleChecked(item.slug)} />
            ) : (
              <ImCheckboxUnchecked onClick={() => handleChecked(item.slug)} />
            )}
            <div className="arrItm">{item.name}</div>
          </div>
        ))}
        {!showAll && array.length > length && (
          <button className="view" onClick={handleViewMore}>
            View More
          </button>
        )}
      </div>
    );
  }
  return (
    <div>
      {displayedItems.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
      {!showAll && array.length > length && (
        <button onClick={handleViewMore}>View More</button>
      )}
    </div>
  );
};

ArrayComponent.defaultProps = {
  array: [],
  type: "courseDescr",
};

export default ArrayComponent;
