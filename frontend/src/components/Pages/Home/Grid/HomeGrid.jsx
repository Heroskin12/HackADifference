import NewFilters from "../NewFilters/NewFilters";
import Grid from "../Grid/Grid";
export default function HomeGrid({
  filterLists,
  data,
  hasMoreVideos,
  fetchNextVideos,
  loadingMore,
}) {
  return (
    <>
      <NewFilters filterLists={filterLists} />
      <Grid
        data={data}
        hasMoreVideos={hasMoreVideos}
        fetchNextVideos={fetchNextVideos}
        loadingMore={loadingMore}
      />
    </>
  );
}
