import { useState } from 'react';
import BookCard from './BookCard';
import VideoCard from './VideoCard';

function ResultsContainer({ results, isLoading }) {
  const [activeTab, setActiveTab] = useState('all');
  const { books, videos } = results;
  
  const tabs = [
    { id: 'all', label: 'All Results' },
    { id: 'books', label: `Books (${books?.length || 0})` },
    { id: 'videos', label: `Videos (${videos?.length || 0})` }
  ];
  
  // Filter results based on active tab
  const filteredResults = () => {
    switch (activeTab) {
      case 'books':
        return { books, videos: [] };
      case 'videos':
        return { books: [], videos };
      default:
        return { books, videos };
    }
  };
  
  const { books: filteredBooks, videos: filteredVideos } = filteredResults();
  
  return (
    <div className="w-full space-y-8">
      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1 bg-secondary/10 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-6 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-800 shadow-sm text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Books section */}
      {(activeTab === 'all' || activeTab === 'books') && filteredBooks.length > 0 && (
        <section className="animate-fade-in-up">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold flex items-center">
              <span className="mr-2 text-2xl"></span> Recommended Books
            </h2>
            {activeTab === 'all' && (
              <button 
                onClick={() => setActiveTab('books')}
                className="text-sm text-primary hover:underline font-medium"
              >
                View all books
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book, index) => (
              <div key={index} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in-up">
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Videos section */}
      {(activeTab === 'all' || activeTab === 'videos') && filteredVideos.length > 0 && (
        <section className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold flex items-center">
              <span className="mr-2 text-2xl"></span> Video Tutorials
            </h2>
            {activeTab === 'all' && (
              <button 
                onClick={() => setActiveTab('videos')}
                className="text-sm text-primary hover:underline font-medium"
              >
                View all videos
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video, index) => (
              <div key={index} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in-up">
                <VideoCard video={video} />
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* No results state */}
      {filteredBooks.length === 0 && filteredVideos.length === 0 && (
        <div className="text-center py-20 bg-secondary/5 rounded-2xl border border-border border-dashed">
          <div className="text-6xl mb-4"></div>
          <h3 className="text-xl font-bold mb-2">No results found</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            We couldn't find any resources matching your query. Try searching for a different topic or keyword.
          </p>
        </div>
      )}
    </div>
  );
}

export default ResultsContainer;
