<%@page session="false" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@include file="/libs/foundation/global.jsp" %>

<%@taglib prefix="ha" uri="http://com.demo.nearly/taglibs/nearly-demo-taglib" %>
<ha:initBean beanType="com.nearly.demo.services.Error404Bean" var="error404Bean"/>

<cq:setContentBundle/>
<c:if test="${empty error404Bean.componentTitle}">
	<fmt:message key="M0010"/>
</c:if>
<div class="page-404">
	<h2 class="page-404__title">${error404Bean.componentTitle}</h2>

	<div class="page-404__content">
		<img src="${error404Bean.fileReference}" alt="${error404Bean.imageAlt}" class="page-404__img">

		<div class="page-404__text-block">
			<div class="page-404__text-title">${error404Bean.errorTitle}</div>
			<div class="page-404__text"><p>${error404Bean.errorText}</p></div>

			<c:if test="${not empty error404Bean.backButtonText}">
				<a role="button" class="common-button common-button_404-page" href="/content/holidayautos/en/homepage.html">
					${error404Bean.backButtonText}<span class="common-button__triangle"><!----></span>
				</a>
			</c:if>
		</div>
	</div>
</div>