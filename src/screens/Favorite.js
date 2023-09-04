import { Contact, Header } from "components";
import LoadingSkeleton from "components/homeComponents/ShopProduct/LoadingSkeleton";
import ProductItem from "components/homeComponents/ShopProduct/ProductItem";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { getFavoriteByFilter } from "reduxToolkit/favoriteSlice";
import { setNavBar } from "reduxToolkit/navBarSlice";
import NavBar from "utils/NavBar";

const Favorite = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const favoriteRedux = useSelector(
    (state) => state.favoriteReducer.favoriteProducts
  );
  const filter = useSelector((state) => state.favoriteReducer.filterFavorite);
  const navigation = useSelector((state) => state.navbarReducer.keyNavBar);
  const keyNavigate = location?.pathname?.split("/")[1];

  useEffect(() => {
    dispatch(setNavBar(keyNavigate));
    dispatch(getFavoriteByFilter("normal"));
  }, []);

  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <Header />
      <div style={{ height: "65px", width: "100%" }}></div>
      <div className="w-full px-[10%] mx-auto pb-8 pt-3 bg-white flex flex-col items-start justify-center">
        {navigation && (
          <div className="w-full mx-auto mb-3">
            <NavBar navigation={navigation} />
          </div>
        )}
        <p className="text-lg font-semibold py-2 w-full">{`Saved Products (${favoriteRedux?.length})`}</p>
        <div className="row row-small-Gutters" style={{ width: "100%" }}>
          <div className="products col l-12 m-grid-12 c-12">
            <div
              class="flex items-center justify-between mb-3 "
              style={{
                height: "60px",
                backgroundColor: "rgba(0,0,0,0.08)",
                borderRadius: "2px",
              }}
            >
              <div className="flex items-center gap-6 justify-start w-full h-full">
                <span
                  class="content-filterControl__sort text-md"
                  style={{ margin: "0 20px", color: "#333" }}
                >
                  Sort by
                </span>
                <div
                  class="text-md flex items-center justify-start gap-12 cursor-pointer"
                  style={
                    filter === "normal"
                      ? { color: "#fff", backgroundColor: "rgb(247, 70, 46)" }
                      : { color: "#333", backgroundColor: "#fff" }
                  }
                  onClick={() => dispatch(getFavoriteByFilter("normal"))}
                >
                  <span className="block px-1.5 py-1.5 text-center">
                    Latest favorite products
                  </span>
                </div>
                <div
                  class="text-md block cursor-pointer"
                  style={
                    filter === "desc"
                      ? { color: "#fff", backgroundColor: "rgb(247, 70, 46)" }
                      : { color: "#333", backgroundColor: "#fff" }
                  }
                  onClick={() => dispatch(getFavoriteByFilter("desc"))}
                >
                  <span className="block px-1.5 py-1.5 text-center">
                    From max to min
                  </span>
                </div>
                <div
                  class="text-md block cursor-pointer"
                  style={
                    filter === "asc"
                      ? { color: "#fff", backgroundColor: "rgb(247, 70, 46)" }
                      : { color: "#333", backgroundColor: "#fff" }
                  }
                  onClick={() => dispatch(getFavoriteByFilter("asc"))}
                >
                  <span className="block px-1.5 py-1.5 text-center">
                    From min to max
                  </span>
                </div>
                <div
                  class="text-md block cursor-pointer"
                  style={
                    filter === "rating"
                      ? { color: "#fff", backgroundColor: "rgb(247, 70, 46)" }
                      : { color: "#333", backgroundColor: "#fff" }
                  }
                  onClick={() => dispatch(getFavoriteByFilter("rating"))}
                >
                  <span className="block px-1.5 py-1.5 text-center">
                    Highest rate of rating
                  </span>
                </div>
              </div>
            </div>

            {favoriteRedux?.length > 0 ? (
              isLoading ? (
                <>
                  <div className="row row-small-Gutters">
                    {Array(favoriteRedux?.length)
                      .fill(0)
                      ?.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="col l-2-4 m-grid-4 c-6 mb-3"
                          >
                            <LoadingSkeleton />
                          </div>
                        );
                      })}
                  </div>
                </>
              ) : (
                <>
                  <div className="row row-small-Gutters">
                    {favoriteRedux?.map((product, index) => {
                      return (
                        <div
                          to={`/products/${product._id}`}
                          key={index}
                          className="col l-2-4 m-grid-4 c-6 mb-3"
                        >
                          <ProductItem
                            product={product?.product}
                            favorite="true"
                          />
                        </div>
                      );
                    })}
                  </div>
                </>
              )
            ) : (
              <img
                className="w-1/2 mx-auto"
                src="/assets/image/no_product.png"
                alt="none"
              />
            )}
          </div>
        </div>
      </div>
      <hr />

      <Contact />
    </div>
  );
};

export default Favorite;
