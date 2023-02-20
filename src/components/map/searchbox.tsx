import { useEffect, useRef, forwardRef } from "react";
import { TextInput } from "@sanity/ui";

interface SearchBoxProps {
  onSelect: Function;
}

const SearchBox = (props: SearchBoxProps) => {
  const { onSelect } = props;

  const inputRef = useRef<Node | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      const searchBox = new (window as any).google.maps.places.SearchBox(
        inputRef.current
      );
      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        if (onSelect) {
          onSelect(places[0]);
        }
      });
      return () => {
        if (searchBox) {
          (window as any).google.maps.event.clearListeners(searchBox);
        }
      };
    }
  }, [inputRef.current]);

  return (
    <TextInput
      ref={(node) => {
        inputRef.current = node;
      }}
    ></TextInput>
  );
};

export default SearchBox;
