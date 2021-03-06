import React, { Component } from 'react';
import { getMovies } from '../services/fakeMoviesService';
import Like from './common/Like';
import Pagination from './common/Pagination';
import Searchbar from './common/Searchbar';
import { paginate } from '../utils/paginate';

class Movies extends Component {

    state = {
        movies: getMovies(),
        pageSize: 4,
        currentPage: 1,
        inputTerm: '',
    };


    handleDelete(movie) {
        this.setState( prevState => {
            const movies = prevState.movies.filter(m => m._id !== movie._id);
            return {
                movies
            }
        });
    }

    handleLike(movie) {
        this.setState( prevState => {
            const movies = prevState.movies;
            const index = movies.indexOf(movie);
            movies[index].liked = !movies[index].liked;
            return { movies };
        });
    }

    handlePageChange = (page) => {
     
        this.setState({currentPage : page});
    }

    render() {

        const { pageSize, currentPage, movies } = this.state;

        if (movies.length === 0) return <p className="text-warning">There are no movies in the db</p>;

        const paginatedMovies = paginate(movies, currentPage, pageSize);
       

        return (
            <React.Fragment>
            <p> There are {movies.length} movies in the DB.</p>
            <Searchbar term={this.state.inputTerm}
                        onSearchEnter={2}
            />
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th />
                            <th />

                        </tr>
                    </thead>
                    <tbody>

                     { paginatedMovies.map( movie => (
                        <tr key={movie._id}>
                            <td>{ movie.title }</td>
                            <td>{ movie.genre.name }</td>
                            <td>{ movie.numberInStock }</td>
                            <td>{ movie.dailyRentalRate } </td>
                            <td>
                                <Like liked={ movie.liked }
                                      onClick={ () => this.handleLike(movie) } />
                            </td>
                            <td>
                                <button onClick={ () => this.handleDelete(movie) }
                                        className="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>
                     ))}
                    </tbody>
                </table>
            </div>
            <Pagination itemsCount={ movies.length }
                        pageSize={ pageSize }
                        currentPage={ currentPage }
                        onPageChange={ this.handlePageChange }
            />
            </React.Fragment>
        );
    }

}

export default Movies;