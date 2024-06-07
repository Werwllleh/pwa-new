import {createRef, useEffect, useState} from "react";
import {Zuck} from "zuck.js";
import cn from "classnames";
import {useStoriesStore} from "../store/stories-store";

const Stories = () => {
  const timestamp = function () {
    let timeIndex = 1678166046264 / 1000;
    let random = Math.floor(Math.random() * 1000);

    return Math.round(timeIndex - random);
  };
  const [stories, updateStories] = useStoriesStore((state) => [state.stories, state.updateStories]);
  const containerRef = createRef();
  const storiesRef = createRef();
  const [list, setList] = useState([]);

  useEffect(() => {
    updateStories()
  }, [])
  useEffect(() => {
    if(stories.length>0){
      setList(stories)
    }

  }, [stories])
  useEffect(() => {
    if(list.length > 0) {
      new Zuck(containerRef.current, {
        previousTap: true,
        skin: 'Snapssenger',
        autoFullScreen: false,
        avatars: false,
        paginationArrows: false,
        list: false,
        cubeEffect: true,
        localStorage: true,
        backButton: false,
        openEffect: true,
        stories: list,
        reactive: true,
      });
    }
  }, [list])
  return (
    <div className={cn('stories-wrap', {'sm-loading':list.length===0})} ref={containerRef}>
      <div className="stories sm-item-secondary" id="stories" ref={storiesRef}>
        {
          list.map((story, index) => (
            <div className={(story.seen ? 'story seen' : 'story')} key={index} data-id={story.id}
                 data-last-updated={story.time} data-photo={story.photo}>
              <a className="item-link" href={story.link}>
                  <span className="item-preview">
                    <img src={story.photo}/>
                  </span>
                <span className="info" itemProp="author" itemScope="" itemType="http://schema.org/Person">
                    <strong className="name" itemProp="name">{story.name}</strong>
                  <span className="time">{story.time}</span>
                  </span>
              </a>
              <ul className="items">
                {
                  story.items.map((storyItem, index) => (

                  <li  data-id={storyItem.id} key={storyItem.id}>
                    <a
                      href="/assets/images/stories/stories-1.jpg"
                      data-id={storyItem.id}
                      data-src={storyItem.src}
                      data-link=""
                      data-time={storyItem.time}
                      data-type="photo"
                      data-length="10"
                      data-preview={storyItem.preview}>
                    <img loading="auto" src={storyItem.src} alt=""/>
                    </a>
                  </li>
                  ))
                }

              </ul>
            </div>
          ))
        }
      </div>
    </div>
  )
}
export default Stories