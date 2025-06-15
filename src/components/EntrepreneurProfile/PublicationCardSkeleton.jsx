import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PublicationCardSkeleton = () => {
  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
      <div className="card shadow-sm border rounded-3 h-100">
        <div className="row g-0">
          {/* Imagen */}
          <div className="col-4 d-flex align-items-center justify-content-center p-3">
            <Skeleton height={100} width={100} />
          </div>

          {/* Contenido */}
          <div className="col-8">
            <div className="card-body p-3">
              <h6 className="card-title mb-2">
                <Skeleton width={`80%`} />
              </h6>
              <div className="mb-2">
                <Skeleton width={60} height={20} />
              </div>

              <div className="mb-2">
                <Skeleton width={80} height={20} />
              </div>

              <p className="text-muted small mb-1">
                <Skeleton width={120} height={15} />
              </p>
              <p className="text-muted small mb-1">
                <Skeleton width={80} height={15} />
              </p>
              <p className="text-muted small mb-1">
                <Skeleton width={100} height={15} />
              </p>
              <p className="text-muted small mb-2">
                <Skeleton width={100} height={15} />
              </p>

              <div className="d-flex justify-content-end gap-1 mt-2">
                <Skeleton width={60} height={30} />
                <Skeleton width={60} height={30} />
                <Skeleton width={60} height={30} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationCardSkeleton;
